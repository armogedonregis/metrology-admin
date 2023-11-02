import differenceInHours from "date-fns/differenceInHours";
import format from "date-fns/format";
import ru from "date-fns/locale/ru";

export const onlineFormatTime = (id: Date) => {
    if (differenceInHours(new Date(id), new Date()) > 24) {
        return `Был онлайн ${format(new Date(id), 'dd LLLL', { locale: ru })}`
    } else {
        return `Онлайн в ${format(new Date(id), 'kk:mm', { locale: ru })}`
    }
};