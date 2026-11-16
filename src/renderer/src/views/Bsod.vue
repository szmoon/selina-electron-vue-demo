<template>
  <div class="bsod">
    <div class="bsod__text">
      <p>
        A problem has been detected and selinaZ OS has been shut down to prevent
        damage to your computer.
      </p>
      <p>
        If this is the first time you've seen this stop error screen, restart
        your computer. if this screen appears again, follow these steps:
      </p>
      <p>
        Check to make sure any new hardware or software is properly installed. I
        this is a new installation, ask your hardware or software manufacturer
        for and selinaZ OS updates you might need.
      </p>
      <p>
        If problems continue, disable or remove any newly installed hardware or
        software. Disable BIOS memory options such as caching or shadowing. If
        you need to use Safe Mode to remove or disable components, restart your
        computer, press F8 to select Advanced Startup Options, and then select
        Safe Mode.
      </p>
      <p>Technical information:</p>
      <p>
        *** STOP: 0x000000FE (0x00000008, 0x000000006, 0x00000009, 0x847075cc)
      </p>
      <p>Hit ESC to restart.</p>
    </div>
    <div class="bsod__hint">press esc to exit</div>
  </div>
</template>

<style lang="scss">
@import '~styles/base';

.bsod {
  height: 100%;
  background: $blue--40;
  color: #ffffff;
  text-align: left;
  @include no-highlight;
}

.bsod__text {
  max-width: 900px;
  padding: 10vh 8vw;
  font-size: 20px;
  line-height: 1.6;
}

.bsod__hint {
  position: fixed;
  bottom: 24px;
  right: 32px;
  opacity: 0.7;
}
</style>
