// tslint:disable:no-shadowed-variable
import axios from 'axios';
import {slugify} from '../utils/helpers';

class DataService {
  data = {
    donation: {
      value: 0,
      cardNumber: '',
      expiration: '',
      cvv: '',
      ownerName: '',
      ownerCPF: '',
    },
    ongs: [],
    ong: {
      recipient: {
        bankAccount: {
          legalName: '${ongName}'
        }
      }
    }
  };

  mock = {
    ongs: [
      {
        id: 're_ck25he6np06auq96e4damfmgo',
        picture: '/assets/images/ongs/nossolar.jpg'
      },
      {
        id: 're_ck25h9teg06arq96egwrru01y',
        picture: '/assets/images/ongs/gavaa.jpg'
      },
      {
        id: 're_ck25h6ui006agl36dhfb52t2r',
        picture: '/assets/images/ongs/viralatas.jpg'
      },
      {
        id: 're_ck25h4ixp06dli56fevj22tzo',
        picture: '/assets/images/ongs/historia.jpg'
      },
      {
        id: 're_ck25gyadq06cli56f0sfjc2e8',
        picture: '/assets/images/ongs/zezinho.png'
      },
      {
        id: 're_ck1cjngtp06lzo46etkhfpajx',
        picture: '/assets/images/ongs/aacc.jpg'
      },
    ]
  };

  getOngs() {
    const url = 'https://plataforma-belter-api.appspot.com/api/ongs'; // production
    // const url = 'http://localhost:4200/assets/fake-data/ongs.json'; // development
    axios.get(url).then(response => this.data.ongs = response.data);
  }

  setSelectedOng(data) {
    this.data.ong = data;
    return this;
  }

  setSelectedOngBySlug(slug) {
    const url = 'https://plataforma-belter-api.appspot.com/api/ongs'; // production
    // const url = 'http://localhost:4200/assets/fake-data/ongs.json'; // development
    axios.get(url).then(response => {
      this.data.ongs = response.data;

      const ongObj = this.data.ongs.filter(ong => slugify(ong.recipient.bankAccount.legalName) === slug);
      if (ongObj.length > 0) {
        this.data.ong = ongObj[0];
      }
      return this;
    });
  }

  getData(key = null) {
    if (!this.data.hasOwnProperty(key)) {
      return this.data;
    }

    return this.data[key];
  }

  setDonation(value) {
    // this.data.donation.value = value;

    const objKey = Object.keys(value)[0];
    const objValue = value[objKey];

    if (this.data.donation.hasOwnProperty(objKey)) {
      this.data.donation[objKey] = objValue;
    }
  }

  setCard(key, value) {
    this.data.donation[key] = value;
    return this;
  }

  loadOngPicture(id) {
    const ong = this.data.ongs.filter(ong => ong.recipient.id === id);
    if (ong.length > 0 && ong[0].recipient.hasOwnProperty('bankAccount') && ong[0].recipient.bankAccount.hasOwnProperty('picture')) {
      return ong[0].recipient.bankAccount.picture;
    }
    const mock = this.mock.ongs.filter(ong => ong.id === id);
    if (mock.length > 0) {
      return (mock[0]).picture;
    }

    return 'https://fakeimg.pl/250/';
  }
}

export default DataService;
