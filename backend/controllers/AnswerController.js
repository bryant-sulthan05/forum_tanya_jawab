import Users from "../models/Users.js";
import Question from "../models/Question.js";
import Answer from "../models/Answer.js";
import { Op } from "sequelize";
import path from "path";
import fs from "fs";

export const getMyAnswerRecords = async (req, res) => {
    try {
        const id = req.userId;
        const answers = await Answer.findAll({
            where: {
                userId: id
            },
            include: [
                {
                    model: Question,
                    as: 'question',
                    attributes: ['id', 'title'],
                    include: [
                        {
                            model: Users,
                            as: 'user',
                            attributes: ['id', 'name', 'username', 'image', 'url']
                        }
                    ]
                }
            ]
        });
        res.status(200).json(answers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAnswerByUser = async (req, res) => {
    try {
        const { id } = req.params;
        const answers = await Answer.findAll({
            where: {
                userId: id
            },
            include: [
                {
                    model: Question,
                    as: 'question',
                    attributes: ['id', 'title'],
                    include: [
                        {
                            model: Users,
                            as: 'user',
                            attributes: ['id', 'name', 'username', 'image', 'url']
                        }
                    ]
                }
            ]
        });
        res.status(200).json(answers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const postAnswer = async (req, res) => {
    const questionId = req.params.id;
    const { answer } = req.body;
    const file = req.files ? req.files.file : null;

    try {
        if (file) {
            const size = file.data.length;
            const ext = path.extname(file.name);
            const uniqueIdentifier = Date.now();
            const fileName = `${file.md5}_${uniqueIdentifier}${ext}`;
            const url = `${req.protocol}://${req.get("host")}/img/answer/${fileName}`;
            const allowedType = ['.jpeg', '.jpg', '.png'];

            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Gambar harus berekstensi .jpeg, .jpg, dan .png" });

            if (size > 5000000) return res.status(422).json({ msg: "Ukuran file maksimal 5mb" });
            await Answer.create({
                questionId: questionId,
                userId: req.userId,
                answer: answer,
                file: fileName,
                url: url
            });
            file.mv(`./public/img/answer/${fileName}`, (err) => {
                if (err) return res.status(500).json({ msg: err.message });
            });
        } else {
            await Answer.create({
                questionId: questionId,
                userId: req.userId,
                answer: answer
            });
        }
        res.status(201).json({ msg: "Jawaban terkirim" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateAnswer = async (req, res) => {
    const { id } = req.params.id;
    const { answer } = req.body;
    const file = req.files.file;
    const size = file.data.length;
    const ext = path.extname(file.name);
    const uniqueIdentifier = Date.now();
    const fileName = `${file.md5}_${uniqueIdentifier}${ext}`;
    const url = `${req.protocol}://${req.get("host")}/img/answer/${fileName}`;
    const allowedType = ['.jpeg', '.jpg', '.png'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Gambar harus berekstensi .jpeg, .jpg, dan .png" });

    if (size > 5000000) return res.status(422).json({ msg: "Ukuran file maksimal 5mb" });

    try {
        const answerData = await Answer.findOne({
            where: {
                [Op.and]: [
                    { id: id },
                    { userId: req.userId }
                ]
            }
        });
        if (!answerData) return res.status(404).json({ msg: "Jawaban tidak ditemukan" });
        if (answerData.file) {
            fs.unlink(`./public/img/answer/${answerData.file}`, (err) => {
                if (err) console.log(err);
            });
        }
        await Answer.update({
            answer: answer,
            file: fileName,
            url: url
        }, {
            where: {
                [Op.and]: [
                    { id: id },
                    { userId: req.userId }
                ]
            }
        });
        file.mv(`./public/img/answer/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
        res.status(200).json({ msg: "Jawaban berhasil diperbarui" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteAnswer = async (req, res) => {
    const { id } = req.params;
    try {
        const answerData = await Answer.findOne({
            where: {
                [Op.and]: [
                    { id: id },
                    { userId: req.userId }
                ]
            }
        });
        if (!answerData) return res.status(404).json({ msg: "Jawaban tidak ditemukan" });
        if (answerData.file) {
            fs.unlink(`./public/img/answer/${answerData.file}`, (err) => {
                if (err) console.log(err);
            });
        }
        await Answer.destroy({
            where: {
                [Op.and]: [
                    { id: id },
                    { userId: req.userId }
                ]
            }
        });
        res.status(200).json({ msg: "Jawaban berhasil dihapus" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}