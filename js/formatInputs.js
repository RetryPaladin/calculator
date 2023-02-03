import { priceFormatter, priceFormatterDecimals } from "./formatters.js";

const maxPrice = 100000000

const inputCost = document.querySelector('#input-cost');
const inputDownPayment = document.querySelector('#input-downpayment')
const inputTerm = document.querySelector('#input-term')
const form = document.querySelector('#form')
const totalCost = document.querySelector('#total-cost')
const totalMonthPayment = document.querySelector('#total-month-payment')

const cleavePriceSetting = {
  numeral: true,
  numeralThousandsGroupStyle: 'thousand',
  delimiter: ' '
}

const cleaveTerm = new Cleave(inputTerm, cleavePriceSetting)

const cleaveCost = new Cleave(inputCost, cleavePriceSetting);


const cleaveDownPayment = new Cleave(inputDownPayment,cleavePriceSetting);

 
calcMortgage()

form.addEventListener('input', function () {
  calcMortgage() 
})

function calcMortgage() {
  const totalAmount = +cleaveCost.getRawValue() - cleaveDownPayment.getRawValue()
  totalCost.innerText = priceFormatter.format(totalAmount)



  const creditRate = +document.querySelector('input[name="program"]:checked').value;

  const monthRate = (creditRate * 100)/12
 

  const years = +cleaveTerm.getRawValue();

  const months = years *12


  const monthPayment = (totalAmount * monthRate) / (1 - (1 + monthRate) * (1 - months))

  totalMonthPayment.innerText = priceFormatterDecimals.format(monthPayment)
}


const sliderCost = document.getElementById('slider-cost');

noUiSlider.create(sliderCost, {
  start: 12000000,
  connect: 'lower',
  tooltips: true,
  step: 100000,
  range: {
    'min': 0,
    '50%': [10000000, 1000000],
    'max': 100000000
  },
  format: wNumb({
    decimals: 0,
    thousand: ' ',
    suffix: '',
  })
});

sliderCost.noUiSlider.on('update', function() {
  const sliderValue = parseInt(sliderCost.noUiSlider.get(true))
  cleaveCost.setRawValue(sliderValue);
  calcMortgage()
})

const sliderDownpayment = document.getElementById('slider-downpayment')

noUiSlider.create(sliderDownpayment, {
  start: 12000000,
  connect: 'lower',
  tooltips: true,
  step: 100000,
  range: {
    'min': 0,
    '50%': [10000000, 1000000],
    'max': 100000000
  },
  format: wNumb({
    decimals: 0,
    thousand: ' ',
    suffix: '',
  })
});

sliderDownpayment.noUiSlider.on('update', function () {
  const sliderValue = parseInt(sliderDownpayment.noUiSlider.get(true))
  cleaveDownPayment.setRawValue(sliderValue);
  calcMortgage()
})

const sliderTerm = document.getElementById('slider-term')

noUiSlider.create(sliderTerm, {
  start: 1,
  connect: 'lower',
  tooltips: true,
  step: 1,
  range: {
    'min': 1,
    'max': 30
  },
 
});

sliderTerm.noUiSlider.on('update', function () {
  const sliderValue = parseInt(sliderTerm.noUiSlider.get(true))
  cleaveTerm.setRawValue(sliderValue);
  calcMortgage()
})

inputCost.addEventListener('input', function() {
  const value = +cleaveCost.getRawValue();
  if (value > maxPrice) {
    inputCost.closest('.param__details').classList.add('param__details--error')
  }
  if (value <= maxPrice) {
    inputCost.closest('.param__details').classList.remove('param__details--error')
    cleaveCost.getRawValue(maxPrice)
  }
})

inputCost.addEventListener('change', function(){
  const value = +cleaveCost.getRawValue();

  if (value > maxPrice) {
    inputCost.closest('.param__details').classList.remove('param__details--error')
    cleaveCost.getRawValue(maxPrice)
  }
  
})