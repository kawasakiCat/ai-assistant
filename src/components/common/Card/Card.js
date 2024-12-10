import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ 
    variant = 'primary',
    size = 'normal',
    title, 
    children, 
    ...props
}) => {

    const variantClass = variant === "primary" ? "primary" : "secondary";
    const cardClasses = [
        'card',
        `card-${variant}`,
        `card-${size}`,
    ].filter(Boolean).join(' ');

    return (
        <div className={`${cardClasses}`}>
            <div className={`card-title title-${variantClass}`}>{title}</div>
            <div className="card-contents">{children}</div>
        </div>
    );
};

Card.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary']),
    size: PropTypes.oneOf(['normal', 'small']),
};

export default Card;