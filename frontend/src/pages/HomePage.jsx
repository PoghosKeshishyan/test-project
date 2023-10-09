import { AuthContext } from '../context/AuthContext'
import { useEffect, useState, useContext } from 'react';
import { Loading } from '../components/Loading';
import { AddCard } from '../components/AddCard';
import { SwiperCards } from '../components/SwiperCards';
import '../scss/HomePage.scss';
import axios from '../axios';

export function HomePage() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalSum, setTotalSum] = useState(0);
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    loadingData();
  });

  useEffect(() => {
    // sum for total varible
    let sum = 0;
    cards.forEach(el => sum += el.card[0].price);
    setTotalSum(sum);
  }, [cards])

  async function loadingData() {
    try {
      await axios.get('api/cards/', {
        headers: {
          'Content-Type': 'application/json',
        },
        // sa beq e gnum, ev darnum e req.query
        params: { userId }
      }).then(res => {
        setCards(res.data);
        setLoading(false);
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='HomePage'>
      {!loading && cards.length > 0 && <h2>Total Balans <span>${totalSum.toLocaleString('en-US')}</span></h2>}
      {loading ? <Loading /> : <SwiperCards cards={cards} />}
      {!loading && <AddCard cards={cards} />}
    </div>
  )
}