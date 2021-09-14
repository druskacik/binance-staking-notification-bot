<template>
  <div class="telegram-button--main">
    <a
      class="telegram-button__button umami--click--telegram-button"
      href="https://t.me/bstaking_bot"
      target="_blank"
    >
      <img
        src="../assets/telegram-logo.svg"
        alt="Telegram Logo"
        class="telegram-button__logo"
      >
      <div>
        Chat with the bot
      </div>
    </a>
  </div>
</template>

<style scoped>

.telegram-button--main {
    padding-top: 1rem;
    width: 100%;
}

.telegram-button__button {
    all: unset;
    display: flex;
    background-color: #27A5E7;
    color: #FFFFFF;
    font-weight: bold;
    align-items: center;
    height: 3rem;
    width: fit-content;
    border-radius: 50px;
    padding: 0 2rem;
    cursor: pointer;
}

.telegram-button__logo {
    width: 2rem;
}

@media screen and (max-width: 600px) {

    .telegram-button__button {
        width: 95%;
        margin: auto;
        padding: 0;
        justify-content: center;
    }

}

</style>
