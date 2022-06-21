import { useState } from 'react';

export const useRestAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(false);
};

export const useRestAPIMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(false);
};
