<header>
    <div class="container !my-0">
      <div class="logo">
        <img src="/logo.svg" class="w-full h-full" alt="Thoanny">
      </div>
      <nav>
        <a href="/blog">📃 <span>Blog</span></a>
        <a href="/categorie/projets">🛠 <span>Projets</span></a>
        <a href="/categorie/trucs-astuces">💡 <span>Astuces</span></a>
        <a href="/categorie/jeux">🎮 <span>Jeux</span></a>
        <a href="/categorie/recettes">🍽 <span>Recettes</span></a>
        <a href="/qui-suis-je">🤵 <span>Qui suis-je&nbsp;?</span></a>
        <a href="https://ko-fi.com/thoanny" target="_blank" class="btn btn-accent rounded-full" rel="noreferrer">☕ Me soutenir</a>
      </nav>
    </div>
  </header>

  <style lang="scss">  
    header {
      @apply relative h-32 bg-primary;
  
      .logo {
        @apply h-36 absolute -top-2 left-0 opacity-25;
        mix-blend-mode: soft-light;
      }
  
      nav {
        @apply absolute top-0 right-0 flex gap-6 h-32 items-center font-semibold text-white uppercase tracking-wider;
  
        a {
          span {
            // text-shadow:1px 0 0 #000,0 1px 0 #000,-1px 0 0 #000,0 -1px 0 #000;
          }
  
          &:hover {
            span {
              text-decoration: underline;
            }
          }
        }
      }    
    }
  </style>