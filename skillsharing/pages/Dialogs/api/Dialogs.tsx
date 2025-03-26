import { DialogItem } from "../../../widgets/Dialog/ui/DialogTypes";

const dialogsMock: DialogItem[] = [
    {
        id: 1,
        name: "Michael Portman",
        avatar: "/Dialogs/mate.png",
        time: 0,
        seen: false,
        text: "Ну короче там эту штуку туда сюда и балдёж",
        tags: [
            'Docker',
            'Kafka',
        ],
    }
];

export async function GetDialogs(userID: string, callback: (dialogsData: DialogItem[]) => void) {
    (new Promise((resolve) => {
        setTimeout(() => {
            resolve(dialogsMock);
        }, 2000);
    })).then((dialogsData) => {
        callback(dialogsData as DialogItem[]);
    })
}