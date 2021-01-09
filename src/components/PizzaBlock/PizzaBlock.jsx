import React from 'react'
import classNames from 'classnames'
import Button from "../Button";

function PizzaBlock({name, id, imageUrl, price, types, sizes, onAddPizza, inCartCount}) {
    const typeNames = ['острое', 'стандарт'] // виды пиццы
    const availableSizes = ['S', 'M', 'XL'] //Размеры пицц
    const [activeType, setActiveType] = React.useState(types[0]) //переменная activeType содержит инедкс 0 массива types
    const [activeSize, setActiveSize] = React.useState(sizes[0]) //переменная activeSize содержит индекс 0 массива sizes

    const onSelectType = (index) => { // меняем вид пиццы (значения 0 и 1)
        setActiveType(index)
    }

    const onSelectSize = (index) => {
        setActiveSize(index)
    }

    const addPizza = () => {
        const obj = {
            id,
            name,
            imageUrl,
            price,
            sizes: availableSizes[activeSize],
            types: typeNames[activeType]
        }
        onAddPizza(obj)
    }

    return (
        <div className="pizza-block">
            <img
                className="pizza-block__image"
                src={imageUrl}
                alt="Pizza"
            />
            <h4 className="pizza-block__title">{name}</h4>
            <div className="pizza-block__selector">
                <ul>
                    {typeNames.map((type, index) => ( // отрисовываем массив typeNames
                        <li
                            key={type}
                            onClick={() => onSelectType(index)} // вызывает метод который  значение activeType меняет на индекс
                            className={classNames({
                                active: activeType === index,
                                disabled: !types.includes(index) // если данный индекс не содержится в массиве
                            })}>
                            {type}
                        </li>
                    ))}
                </ul>
                <ul>
                    {
                        availableSizes.map((size, index) => (
                            <li key={size}
                                onClick={() => onSelectSize(index)}
                                className={classNames({
                                    active: activeSize === index,
                                    disabled: !sizes.includes(size)
                                })}>
                                {size}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {price} ТГ</div>
                <Button onClick={addPizza} className='button--add' outline>
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    {inCartCount&&<i>{inCartCount}</i>}
                </Button>
            </div>
        </div>
    )
}

export default PizzaBlock