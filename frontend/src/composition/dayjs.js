import dayjs from 'dayjs';
import 'dayjs/locale/hr';
dayjs.locale('hr');
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

export const formatDate = (date) => dayjs(date).format('llll');
