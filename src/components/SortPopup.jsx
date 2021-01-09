import React from 'react'

const SortPopup = React.memo(function SortPopup({items, activeSort, onClickSort}) {
    const [visiblePopup, setVisiblePopup] = React.useState(false) // значение переменной visiblePopup по умолчанию false

    const sortRef = React.useRef() //тут хранится ссылка на весь блок
    const activeLabel = items.find((obj) => obj.type === activeSort).name//хранит имя индекса переданного массива в пропсах, проще говоря отображает действующий вид сортировки который мы выбрали через onClick

    const onSelectItem = (index) => {
        onClickSort(index)
        setVisiblePopup(false)
    }

    const toggleVisiblePopup = () => { // Метод для изменения состояния переменной visiblePopup, который мы передаем в метод Onclick
        setVisiblePopup(!visiblePopup)
    }

    const handleOutsideClick = (e) => {
        if (!e.path.includes(sortRef.current)) {// тут идет проверка, если элемент по которому кликают не содержится в sortRef, то VisiblePopup становится фолс, и блок исчезает
            setVisiblePopup(false)
        }
    }

    React.useEffect(() => { //Отрисовывает страницу, и следит за изменениями на всей странице, так как в [] мы ничего не передали, и как только произойдет клик мы выполним функцию handleOutsideClick
        document.body.addEventListener('click', handleOutsideClick)
    }, [])


    return (//тут мы в ref передали переменную sortRef
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={toggleVisiblePopup}>{activeLabel}</span>
            </div>
            {/*visiblePopup &&    -    является проверкой условием, если true то отрисует последующий контент*/}
            {visiblePopup && <div className="sort__popup">
                <ul>
                    {//items &&
                        items.map((obj, index) => (
                            <li
                                className={activeSort === obj.type ? 'active' : ''}
                                onClick={() => onSelectItem(obj)}
                                key={`${obj.type}_${index}`}>{obj.name}
                            </li>
                        ))
                    }
                </ul>
            </div>}
        </div>
    )
})

export default SortPopup