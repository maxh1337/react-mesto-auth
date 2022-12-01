import React, {useState} from 'react';
import { useMutation } from 'react-query';
import { $api } from '../../../api/api';

const EditUserPopup = ({isVisible, onClick, refetch, closeAllPopups}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        changeProfileData()
    }

    const {mutate: changeProfileData} = useMutation(
        'Change profile data',
        () => 
        $api({
            url: '/users/profile',
            type: 'PUT',
            body: {name, description},
            auth: true
        }),
        {
            onSuccess(){
                refetch()
                closeAllPopups()
            }
        }
    )



    return (
        <section className={isVisible ? "popup popup_opened" : "popup"} onClick={() => {
            onClick();
            setName('')
            setDescription('')
        }}>
            <div className='popup__container' onClick={e => e.stopPropagation()}>
                <button title='close-button' type="reset"
                        className='popup__close-button popup__close-button_parent-corners_straight'/>
                <h2 className="popup__title">Обновить профиль</h2>
                <form onSubmit={handleSubmit} className='form'>
                    <input className='form__input' placeholder='Изменить имя' value={name}
                           onChange={(e) => setName(e.target.value)}/>
                    <input className='form__input' placeholder='Изменить описание' value={description}
                           onChange={(e) => setDescription(e.target.value)}/>
                    <button
                        title="Обновить"
                        type="submit"
                        className='popup__button form__button'
                    >
                        Обновить
                    </button>
                </form>
            </div>
        </section>
    );
};

export default EditUserPopup;