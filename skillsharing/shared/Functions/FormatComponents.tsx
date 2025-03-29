/**
 * Normalizes textarea to given height after each this changing
 * @param textareaID - The ID of given selected textarea
 * @param textareaInitialHeight - The initial height of textarea
 */
export function NormalizeTextarea(textareaID: string, textareaInitialHeight: number) {
    const textareaInput: HTMLElement | null = document.getElementById(textareaID);

    if (textareaInput !== null) {
        textareaInput.style.height = `${textareaInitialHeight}px`;
        textareaInput.style.height = textareaInput.scrollHeight + "px";
    }
}