const trashContainer = document.querySelector(".trash-container")
const moneyElem = document.querySelector(".money")
const numberFormatter = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

const MAX_MONEY_RAISED = 30000000
const XXL_TRASH_MONEY = 1000000
const XL_TRASH_MONEY = 100000
const LG_TRASH_MONEY = 10000
const MD_TRASH_MONEY = 1000
const SM_TRASH_MONEY = 100
const XS_TRASH_MONEY = 10
const bagSvg = `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="#000000"><g><rect fill="none" /><path d="M18,6h-2c0-2.21-1.79-4-4-4S8,3.79,8,6H6C4.9,6,4,6.9,4,8v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8C20,6.9,19.1,6,18,6z M10,10c0,0.55-0.45,1-1,1s-1-0.45-1-1V8h2V10z M12,4c1.1,0,2,0.9,2,2h-4C10,4.9,10.9,4,12,4z M16,10c0,0.55-0.45,1-1,1 s-1-0.45-1-1V8h2V10z"/></g></svg>`
const bottleSvg = `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="#000000"><g><rect fill="none"/></g><g><path d="M20.63,8.54l-0.95-0.32C19.28,8.09,19,7.71,19,7.28V3c0-0.55-0.45-1-1-1h-3c-0.55,0-1,0.45-1,1v4.28 c0,0.43-0.28,0.81-0.68,0.95l-0.95,0.32C11.55,8.82,11,9.58,11,10.44V20c0,1.1,0.9,2,2,2h7c1.1,0,2-0.9,2-2v-9.56 C22,9.58,21.45,8.82,20.63,8.54z M16,4h1v1h-1V4z M13,10.44l0.95-0.32C15.18,9.72,16,8.57,16,7.28V7h1v0.28 c0,1.29,0.82,2.44,2.05,2.85L20,10.44V12h-7V10.44z M20,20h-7v-2h7V20z"/></g></g></g></svg>`
const headphonesSvg = `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="#000000"><g><rect fill="none" /></g><g><path d="M12,3c-4.97,0-9,4.03-9,9v7c0,1.1,0.9,2,2,2h4v-8H5v-1c0-3.87,3.13-7,7-7s7,3.13,7,7v1h-4v8h4c1.1,0,2-0.9,2-2v-7 C21,7.03,16.97,3,12,3z"/></g></svg>`
const phoneSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 5h10v14H7z" opacity=".3"/><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>`
const takeoutBoxSvg = `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="#000000"><g><rect fill="none" /></g><g><path d="M5.26,11h13.48l-0.67,9H5.93L5.26,11z M9.02,4h5.95L19,7.38l1.59-1.59L22,7.21 L19.21,10H4.79L2,7.21l1.41-1.41L5,7.38L9.02,4z" fill-rule="evenodd"/></g></svg>`
const toyCarSvg = `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="#000000"><g display="none"><rect display="inline" fill="none" y="0"/></g><g><path d="M22,14c0-1.95-1.4-3.57-3.25-3.92L17.4,6.05C17,4.82,15.85,4,14.56,4H9.44C8.15,4,7,4.82,6.6,6.05L5.81,8.4L4.41,7 l0.29-0.29c0.39-0.39,0.39-1.02,0-1.41c-0.39-0.39-1.02-0.39-1.41,0l-2,2c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0 L3,8.41l1.79,1.79C3.18,10.72,2,12.22,2,14c0,1.5,0.83,2.79,2.05,3.48C4.28,18.9,5.51,20,7,20c1.3,0,2.4-0.84,2.82-2h4.37 c0.41,1.16,1.51,2,2.82,2c1.49,0,2.72-1.1,2.95-2.52C21.17,16.79,22,15.5,22,14z M7,18c-0.55,0-1-0.45-1-1s0.45-1,1-1s1,0.45,1,1 S7.55,18,7,18z M11,10H7.41L7.39,9.98l1.1-3.3C8.63,6.27,9.01,6,9.44,6H11V10z M13,6h1.56c0.43,0,0.81,0.27,0.95,0.68L16.61,10H13 V6z M17,18c-0.55,0-1-0.45-1-1s0.45-1,1-1s1,0.45,1,1S17.55,18,17,18z"/></g></svg>`

const amountRaised = 12341342
moneyElem.innerText = numberFormatter.format(amountRaised)

const amountLeftToRaise = Math.max(MAX_MONEY_RAISED - amountRaised, 0)
const trashAmounts = {}
trashAmounts.xxl = {
  amount: Math.floor(amountLeftToRaise / XXL_TRASH_MONEY),
  icon: bagSvg,
}
trashAmounts.xl = {
  amount: Math.floor((amountLeftToRaise % XXL_TRASH_MONEY) / XL_TRASH_MONEY),
  icon: takeoutBoxSvg,
}
trashAmounts.md = {
  amount: Math.floor((amountLeftToRaise % XL_TRASH_MONEY) / LG_TRASH_MONEY),
  icon: headphonesSvg,
}
trashAmounts.md = {
  amount: Math.floor((amountLeftToRaise % LG_TRASH_MONEY) / MD_TRASH_MONEY),
  icon: phoneSvg,
}
trashAmounts.sm = {
  amount: Math.floor((amountLeftToRaise % MD_TRASH_MONEY) / SM_TRASH_MONEY),
  icon: toyCarSvg,
}
trashAmounts.xs = {
  amount: Math.floor((amountLeftToRaise % SM_TRASH_MONEY) / XS_TRASH_MONEY),
  icon: bottleSvg,
}

Object.values(trashAmounts).forEach(({ amount, icon, size }) => {
  for (let i = 0; i < amount; i++) createTrash(icon, size)
})

function createTrash(icon) {
  const div = document.createElement("div")
  const top = randomNumberBetween(0, 50)
  const size = top / 5 + 1
  div.classList.add("trash")
  div.innerHTML = icon
  div.style.width = `${size}vmin`
  div.style.height = `${size}vmin`
  div.style.top = `${top}vh`
  div.style.left = `${randomNumberBetween(0, 100)}vw`
  div.style.setProperty("--rotation", `${randomNumberBetween(-30, 30)}deg`)
  trashContainer.appendChild(div)
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
