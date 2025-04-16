import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACK_URL, CHAT_URL } from "../../../shared/Consts/URLS";
import { MessageRequest } from "../../../shared/Consts/Interfaces";

// const structurizedMessageMock: IMessage = {
//     message_id: "20",
//     channel_id: "3443",
//     user_id: "67ed4e0a66ab0aab711f8476",
//     payload: "",
//     peer_id: "4334",
//     created_at: 2322,
//     updated_at: 4343,
//     structurized: "## Дополнение ответа\nТы не дурак, просто у тебя есть вопросы, на которые ты хочешь получить ответы. Это нормально, и я здесь, чтобы помочь тебе в этом.\n\n## Пропущенные моменты\nВажно помнить, что каждый человек имеет право на ошибку и на то, чтобы задавать вопросы. Это часть процесса обучения и роста. Не стоит стесняться своих вопросов или сомнений, так как они могут привести к новым открытиям и пониманию.\n\n## Примеры\n1. Например, если ты задаёшь вопрос о сложной теме, это не делает тебя менее умным. Наоборот, это показывает твою заинтересованность и стремление к знаниям.\n2. Многие великие учёные и изобретатели задавали множество вопросов и делали ошибки на своём пути к успеху. Например, Томас Эдисон, который известен своими многочисленными неудачами перед тем, как изобрёл электрическую лампочку.\n3. В школе или на работе часто возникают ситуации, когда нужно задать вопрос, чтобы лучше понять задачу или проект. Это нормально и даже полезно для всех участников процесса.\n  \n\n## Полезные ссылки  \n1. Эдисон, Томас — Википедия - https://ru.wikipedia.org/wiki/%D0%AD%D0%B4%D0%B8%D1%81%D0%BE%D0%BD,_%D0%A2%D0%BE%D0%BC%D0%B0%D1%81  \n2. Математика неудач | Экономика - Поведенческая экономика ... - https://econs.online/articles/ekonomika/matematika-neudach/  \n3. = ры - https://www.govinfo.gov/content/pkg/GOVPUB-OTHER-cd0e73178721f6e0edafe21e33d6fc43/pdf/GOVPUB-OTHER-cd0e73178721f6e0edafe21e33d6fc43.pdf  \n4. Как выжить в неидеальном мире - https://vegjournal.com/filosofiya/tochka-zreniya/2051-kak-vyzhit-v-neidealnom-mire.html  \n5. ОЛИМПИАДНЫЕ ЗАДАНИЯ (сценарии) - https://abiturient.mgimo.ru/upload/ckeditor/files/olimpiadnyye-zadaniya-2013-15.pdf  \n6. Ученые и известные личности, которые плохо учились в школе ... - https://zaochnik.ru/blog/genii-i-dvoechniki-znamenitye-uchenye-politiki-i-literatory-kotorye-uchilis-ploxo/  \n7. Ошибка – негативный опыт бывает полезным - Страница ... - https://okolovo.logoysk-edu.gov.by/%D0%B2%D0%BE%D1%81%D0%BF%D0%B8%D1%82%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0/%D1%81%D0%BE%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0/%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D0%B0-%D0%BF%D0%B5%D0%B4%D0%B0%D0%B3%D0%BE%D0%B3%D0%B0-%D1%81%D0%BE%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B3%D0%BE/p-16313.html  \n8. ОТ СТУДЕНТА ДО ПРОФЕССОРА - https://www.researchgate.net/profile/Danylo-Kin/publication/344327572_Ot_studenta_do_professora_Zivoe_avtobiograficeskoe_ucebnoe_nagladnoe_posobie/links/5f686c4e458515b7cf4484dc/Ot-studenta-do-professora-Zivoe-avtobiograficeskoe-ucebnoe-nagladnoe-posobie.pdf  \n9. Сотворена, чтобы быть его помощницей - https://chve.org.ua/wp-content/uploads/2018/01/%D0%A1%D0%BE%D1%82%D0%B2%D0%BE%D1%80%D0%B5%D0%BD%D0%B0-%D0%B1%D1%8B%D1%82%D1%8C-%D0%B5%D0%B3%D0%BE-%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D0%BD%D0%B8%D1%86%D0%B5%D0%B9-%D0%9F%D0%B5%D1%80%D0%BB.pdf  \n10. Из дневника Николы Теслы: Я часто жалею о том, что в свое ... - https://m.vk.com/wall-36928352_37753?lang=en  \n",
// }

export const GetMessageById = createAsyncThunk(
    'structurizedMessage/getMessageById',
    async ({messageId, userId}: MessageRequest) => {
        try {
            const {status, data} = await axios.get(BACK_URL + CHAT_URL + `/messages/${messageId}`);

            return {status, messageData: {message: data.message, userId}};
        } catch(event) {
            console.error(event);
            return  {status, messageData: undefined};
        }
    }
);