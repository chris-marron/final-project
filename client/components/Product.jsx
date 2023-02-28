import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const Product = ({ product }) => {
  return (
    <div>{product.title}</div>
  );
};
