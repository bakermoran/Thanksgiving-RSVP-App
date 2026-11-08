type FullAddress = {
  address1: string;
  address2: string | null;
  city: string;
  state: string;
  zip: string;
};

export const toAddressString = (address: FullAddress) => {
  return `${address.address1}${address.address2 ? `, ${address.address2}` : ""}, ${address.city}, ${address.state} ${address.zip}`;
};

export const mapsLink = (address: FullAddress) => {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(toAddressString(address))}`;
};
