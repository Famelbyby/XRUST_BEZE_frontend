import React from 'react';
import './Landing.scss';

const LandingContent: React.FC = () => {
    return (
        <div className="landing-content">
            <div className="landing-content-brief">
                <img
                    className="landing-content-brief__background"
                    src="/LandingPage/disc2.jpg"
                    alt=""
                />
                <div className="landing-content-brief__title">
                    <h3>Что такое Skill Sharing</h3>
                </div>
                <div className="landing-content-brief__description">
                    Делись опытом и вникай в новые технологии вместе с другими такими же активными
                    пользователями.
                </div>
            </div>
            <div className="landing-content-goals">
                <div className="landing-content-goals__title">
                    Мы стремимся объединить людей разных специальностей для взаимопомощи, будь то
                    студенты младших/старших курсов, то лишь поступающие абитуриенты, то опытные и
                    амбициозные IT-специалисты. Наша задача - сделать удобный сервис для обмена
                    знаниями среди людей.
                </div>
            </div>
            <div className="landing-content-functions">
                <div className="landing-content-functions-title">Что мы предлагаем</div>
                <div className="landing-content-functions-item landing-content-functions-item_reversed">
                    <div className="landing-content-functions-preview">
                        <img
                            className="landing-content-functions-preview__img"
                            src="/LandingPage/disc4.jpeg"
                            alt=""
                        />
                    </div>
                    <div className="landing-content-functions-item-description">
                        <div className="landing-content-functions-item__title">
                            Разностороннее комьюнити
                        </div>
                        <div className="landing-content-functions-item__text">
                            Широкий спектр экспертов, хорошо разбирающихся в своём деле, которые
                            ждут ваших вопросов. Вы найдёте здесь всё: начиная с линейной алгебры и
                            математического анализа и заканчивая программированием на Java.
                        </div>
                    </div>
                </div>
                <div className="landing-content-functions-item">
                    <div className="landing-content-functions-preview">
                        <img
                            className="landing-content-functions-preview__img"
                            src="/LandingPage/disc3.jpg"
                            alt=""
                        />
                    </div>
                    <div className="landing-content-functions-item-description">
                        <div className="landing-content-functions-item__title">
                            Учебные материалы
                        </div>
                        <div className="landing-content-functions-item__text">
                            Большая база учебных материалов всех форматов: методички, статьи,
                            рефераты и многое другое. Чтобы поделиться материалом, достаточно просто
                            отправить его в личном чате — не нужно вручную публиковать или заполнять
                            формы. Мы автоматически обработаем вложение с помощью ML-модели:
                            определим, относится ли оно к учебным материалам, добавим подходящие
                            теги и разместим его в общей базе.
                        </div>
                    </div>
                </div>
                <div className="landing-content-functions-item landing-content-functions-item_reversed">
                    <div className="landing-content-functions-preview">
                        <img
                            className="landing-content-functions-preview__img"
                            src="/LandingPage/disc5.jpg"
                            alt=""
                        />
                    </div>
                    <div className="landing-content-functions-item-description">
                        <div className="landing-content-functions-item__title">
                            Помощь в объяснении
                        </div>
                        <div className="landing-content-functions-item__text">
                            Непонятно, что пытался донести эксперт в своём сообщении? Мы можем
                            подробнее разъяснить с помощью магии и капельки машинного обучения.
                        </div>
                    </div>
                </div>
                <div className="landing-content-functions-ending">
                    Присоединяйтесь грызть гранит науки прямо сейчас!
                </div>
            </div>
        </div>
    );
};

const LandingFooter: React.FC = () => {
    return (
        <div className="landing-footer">
            <div className="landing-footer-copyrights">© XRUST BEZE 2025</div>
            <div className="landing-footer-logo">SkillSharing</div>
        </div>
    );
};

const Landing: React.FC = () => {
    return (
        <div className="landing-page">
            <LandingContent />
            <LandingFooter />
        </div>
    );
};

export default Landing;
