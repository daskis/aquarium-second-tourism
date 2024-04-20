import cls from './Notfound.module.scss'

export const NotfoundComponement = () => {
    return (
        <div style={{minHeight:'60px', display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'column',
        padding:'8px'
        }}>
            <span className={cls.title}>Ничего не нашлось</span>
            <span>Тут будет иконка</span>
        </div>
    );
};

