// tslint:disable:no-shadowed-variable
import axios from 'axios';
import {slugify} from '../utils/helpers';
import {objectKeys} from "codelyzer/util/objectKeys";

export class DataService {
  constructor() {
  }

  data = {
    donation: {
      planId: 0,
      value: 0,
      cardNumber: '',
      expiration: '',
      cvv: '',
      ownerEmail: '',
      ownerName: '',
      ownerCPF: '',
    },
    ongs: [],
    ong: {
      recipient: {
        bankAccount: {
          legalName: '${ongName}'
        },
        id: null
      }
    },
    plans: [],
    plan: {
      id: 0
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
    ],
    plans: [
      // {
      //   amount: 3000,
      //   id: '443364',
      //   name: 'R$ 30,00'
      // },
      // {
      //   amount: 5000,
      //   id: '443364',
      //   name: 'R$ 50,00'
      // }
    ]
  };

  getOngs() {
    const url = 'https://plataforma-belter-api.appspot.com/api/ongs'; // production
    // const url = 'http://localhost:4200/assets/fake-data/ongs.json'; // development
    axios.get(url).then(response => this.data.ongs = response.data);
  }

  getPlans() {
    const url = 'https://plataforma-belter-api.appspot.com/api/plans'; // production
    axios.get(url).then(response => {
      this.data.plans = response.data;
      //const resolvedPlans = this.resolvePlans(true);
    });
  }

  // resolvePlans(needResolver = true) {
  //   console.log(this.data.plans);
  //   if (this.data.plans.length === 0) {
  //     return [];
  //   }

  //   if (!needResolver) {
  //     return this.data.plans;
  //   }

  //   return [
  //     ...this.data.plans.filter(plan => plan.id !== '0'),
  //     ...this.mock.plans
  //   ].sort((a, b) => (a.amount > b.amount) ? 1 : -1);
  // }

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
    const objKey = Object.keys(value)[0];
    const objValue = value[objKey];

    if (this.data.donation.hasOwnProperty(objKey)) {
      this.data.donation[objKey] = objValue;
    }

    return objValue;
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

  createDonationDataFactory() {

    let totalInput = (document.getElementById('custom-donation-input') as HTMLInputElement).value;
    // let newTotal = totalInput.replace(',', '').replace('.', '');
    let newTotal = totalInput + '00';

    return {
      creditCard: {
        card_number: this.data.donation.cardNumber.replace(' ', ''),
        card_cvv: this.data.donation.cvv,
        card_holder_name: this.data.donation.ownerName,
        card_expiration_date: this.data.donation.expiration.replace('/', '')
      },
      customer: {
        email: this.data.donation.ownerEmail,
        name: this.data.donation.ownerName,
        document_number: this.data.donation.ownerCPF
      },
      plan_id: this.data.donation.planId,
      amount: newTotal,
      split_rules: [
        {
          recipient_id: this.data.ong.recipient.id
        }
      ]
    };
  }

  postDonation() {
    console.log(this.createDonationDataFactory());
    const url = 'https://plataforma-belter-api.appspot.com/api/public/donate';
    return axios.post(url, this.createDonationDataFactory());
  }
}
