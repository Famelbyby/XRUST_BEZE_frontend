import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../../app/AppStore";
import NotFound from "../../../features/404/404";
import {GetMessageById} from '../api/StructurizedMessage'
import StructurizedMessageContent from '../../../widgets/StructurizedMessageContent/StructurizedMessageContent'
import './StructurizedMessage.scss'
import { Helmet } from "react-helmet";
import { clearMessage } from "../../../app/slices/StructurizedMessageSlice";

const StructurizedMessage: React.FC = () => {
    const navigateTo = useNavigate();
    const {badMessageError, message} = useSelector((state: AppState) => state.structurizedMessage);
    const {user} = useSelector((state: AppState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();
    const messageId = params.messageId;

    useEffect(() => {
        if (messageId !== undefined && user !== undefined) {
            dispatch(GetMessageById({messageId, userId: user.id}));
        }

        return () => {
            dispatch(clearMessage());
        }
    }, [dispatch, messageId, user]);

    return (
        <div className='str-message-page'>
            <Helmet>
                <title>Структуризированное сообщение</title>
            </Helmet>
            {!badMessageError &&
                <>
                    <div className='str-message-go-back'>
                        <div className='str-message-go-back-wrapper' onClick={() => {
                            navigateTo(-1);
                        }}>
                            <img className='str-message-go-back__img' src='/shared/go-back.png' alt='' />
                        </div>
                    </div>
                    <StructurizedMessageContent message={message} isOnPage={true}/>
                </> 
            }
            {badMessageError && 
                <NotFound />
            }
        </div>
    );
};

export default StructurizedMessage;