export const getTotalByType = (item, type) => {
  if (type === 'Etoll') {
    return item.eMandiri + item.eBri + item.eBni + item.eBca + item.eNobu + item.eDKI + item.eMega;
  } else if (type === 'KTP') {
    return item.DinasKary + item.DinasMitra + item.DinasOpr;
  } else if (type === 'Tunai') {
    return item.Tunai;
  } else if (type === 'eFlo') {
    return item.eFlo;
  } else if (type === 'E-Toll + eFlo + Tunai') {
    return (
      item.Tunai +
      item.eFlo +
      item.eMandiri + item.eBri + item.eBni + item.eBca + item.eNobu + item.eDKI + item.eMega
    );
  } else if (type === 'All') {
    return (
      item.Tunai +
      item.eFlo +
      item.eMandiri + item.eBri + item.eBni + item.eBca + item.eNobu + item.eDKI + item.eMega +
      item.DinasKary + item.DinasMitra + item.DinasOpr
    );
  }
  return 0;
};