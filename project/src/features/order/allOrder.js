import React, { useEffect, useState } from 'react';
import { fetchAllOrders } from './orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Box, Button, TextField } from '@mui/material';
import { styled } from '@mui/system';
import './allOrder.scss';

const StyledButton = styled(Button)({
  backgroundColor: '#ff3131',
  color: 'white',
  margin: '0 10px',
  height: '50px',
  '&:hover': {
    backgroundColor: '#a31616',
  },
});

const StyledTextField = styled(TextField)({
  margin: '0 10px',
  height: '40px',
  width: '200px',
});

const AllOrder = ({ updateOrder }) => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order?.orders);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const navigate = useNavigate();

  const fetchAllOrder = async () => {
    await dispatch(fetchAllOrders());
  };

  useEffect(() => {
    fetchAllOrder();
  }, []);

  useEffect(() => {
    if (orders) {
      if (currentUser?.id === 0) {
        setFilteredOrders(orders);
      } else {
        setFilteredOrders(orders.filter((order) => order.userId === currentUser?.id));
      }
    }
  }, [orders, currentUser]);

  const calculateTotal = (cart) => {
    return cart.reduce((total, item) => {
      return total + item.product.price * item.amount;
    }, 0);
  };

  const renderHeader = () => {
    let headerElement = ['id', 'orderDate', 'dueDate', 'total', 'operation'];
    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderBody = () => {
    return filteredOrders && filteredOrders.length > 0 ? (
      <tbody>
        {filteredOrders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.orderDate}</td>
            <td>{order.dueDate}</td>
            <td>{calculateTotal(order.cart).toFixed(2)}</td>
            <td className="operation">
              <button className="button" onClick={() => updateOrder(order)}>More Details</button>
            </td>
          </tr>
        ))}
      </tbody>
    ) : (
      <tbody>
        <tr>
          <td colSpan="5">Loading orders...</td>
        </tr>
      </tbody>
    );
  };

  const parseDate = (dateString) => {
    if (!dateString) {
      return new Date(0);
    }
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  const sortOrdersByDate = () => {
    if (currentUser.id === 0) {
      const sortedOrders = [...filteredOrders].sort((a, b) => parseDate(a.orderDate) - parseDate(b.orderDate));
      setFilteredOrders(sortedOrders);
    }
  };

  const filterOrdersByDate = () => {
    if (currentUser?.id === 0) {
      const filtered = orders.filter((order) => parseDate(order.orderDate) >= new Date(filterDate));
      setFilteredOrders(filtered);
    }
  };

  return (
    <div className='allOrder'>
      {currentUser?.id === 0 && (
        <div className="filter-buttons" style={{ marginBottom: '40px', marginTop: '40px' }}>
          <StyledButton onClick={sortOrdersByDate}>Sort by Order Date</StyledButton>
          <StyledTextField
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <StyledButton onClick={filterOrdersByDate}>Filter by Date</StyledButton>
        </div>
      )}
      <div style={{ marginBottom: '40px' }}></div> {/* הוספת מרווח לפני הטבלה */}
      <table id='employee'>
        <thead>
          <tr>{renderHeader()}</tr>
        </thead>
        {renderBody()}
      </table>
    </div>
  );
};

export default AllOrder;
