
import { ReactComponent as LangDe } from '@assets/images/de.svg';
import { ReactComponent as EnUS } from '@assets/images/enUS.svg';
import { ReactComponent as LangFr } from '@assets/images/fr.svg';
import { ReactComponent as LangIt } from '@assets/images/it.svg';
import { ReactComponent as LangJa } from '@assets/images/ja.svg';
import { ReactComponent as LangKo } from '@assets/images/ko.svg';
import { ReactComponent as LangRu } from '@assets/images/ru.svg';
import { ReactComponent as ZhCN } from '@assets/images/zhCN.svg';
const languages: Language[] = [
    {
        key: 'zh-CN',
        icon: ZhCN,
        label: '简体中文'
    },
    { key: 'en-US', icon: EnUS, label: 'English' },
    { key: 'de', icon: LangDe, label: 'Deutschland' },

    {
        key: 'ja',
        icon: LangJa,
        label: '日本'
    },
    {
        key: 'ko',
        icon: LangKo,
        label: '대한민국'
    },

    {
        key: 'fr',
        icon: LangFr,
        label: 'France'
    },

    {
        key: 'it',
        icon: LangIt,
        label: 'Italia'
    },

    {
        key: 'ru',
        icon: LangRu,
        label: 'Россия'
    }
];

export default languages;
