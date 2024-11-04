import browniImage from '../../assets/images/products/browni.png';
import cocacolaImage from '../../assets/images/products/cocacola.png';
import fairyImage from '../../assets/images/products/fairy.png';
import muzImage from '../../assets/images/products/muz.png';

const products = [
  {
    id: 1,
    name: "Eti Browni",
    price: 13.99,
    image: browniImage,
    stores: ["BİM", "A101", "ŞOK", "MİGROS"]
  },
  {
    id: 2,
    name: "Cocacola",
    price: 44.99,
    image: cocacolaImage,
    stores: ["A101", "ŞOK", "MİGROS"]
  },
  {
    id: 3,
    name: "Fairy",
    price: 79.99,
    image: fairyImage,
    stores: ["BİM", "A101", "MİGROS"]
  },
  {
    id: 4,
    name: "Muz",
    price: 45.00,
    image: muzImage,
    stores: ["BİM", "A101", "ŞOK", "MİGROS"]
  }
];

export default products;