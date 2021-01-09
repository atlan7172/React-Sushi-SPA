import React from 'react'
import {Categories, PizzaBlock, SortPopup} from "../components";
import {useDispatch, useSelector} from "react-redux";
import {setCategory, setSortBy} from "../redux/actions/filters";
import {fetchPizzas} from "../redux/actions/pizzas";
import PizzaLoader from "../components/PizzaBlock/PizzaLoader";
import {addPizzaToCart} from "../redux/actions/cart";

const categoryNames = ['Роллы', 'Супы', 'Сашими', "Салаты"]; //categoryNames и sortItems мы не заносим в Редакс так как они не часто меняются
const sortItems = [
    {name: 'популярности', type: 'popular', order: 'desc'},
    {name: 'цене', type: 'price', order: 'desc'},
    {name: 'алфавиту', type: 'alphabet', order: 'asc'}
]

function Home() {

    const dispatch = useDispatch()                                 //useDispatch функция у которого есть доступ ко всем ActionCreator, аналог mapDispatchToProps

    const items = useSelector(({pizzas}) => pizzas.items)   //useSelector функция у которого есть доступ ко всему store, аналог mapStateToProps
    const cartItems = useSelector(({cart}) => cart.items)
    const isLoaded = useSelector(({pizzas}) => pizzas.isLoaded)
    const {category, sortBy} = useSelector(({filters}) => filters)

    React.useEffect(() => {                                  //React.useEffect функция который следит за изменениями filters state: category, sortBy
        dispatch(fetchPizzas(category, sortBy))                                    //fetchPizzas функция которая отрисовывает пиццы при изменении вида пицц или сортировки пицц
    }, [category, sortBy])

    const onSelectCategory = React.useCallback((index) => {
        dispatch(setCategory(index))
    }, [])

    const onSelectSortType = React.useCallback((type) => {
        dispatch(setSortBy(type))
    }, [])

    const handleAddPizza = obj => {
        dispatch(addPizzaToCart(obj))
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    activeCategory={category}
                    onClickItem={onSelectCategory}
                    items={categoryNames}/>
                <SortPopup
                    onClickSort={onSelectSortType}
                    activeSort={sortBy.type}
                    items={sortItems}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoaded                                                                       //если isLoaded true то мы подгружаем пиццы, если нет то запускается PizzaLoader
                    ? items.map(obj => <PizzaBlock onAddPizza={handleAddPizza} key={obj.id}
                                                   inCartCount={cartItems[obj.id] && cartItems[obj.id].length} {...obj}/>)
                    : Array(12).fill(0).map((_, index) => <PizzaLoader key={index}/>)
                }
            </div>
        </div>
    )
}

export default Home