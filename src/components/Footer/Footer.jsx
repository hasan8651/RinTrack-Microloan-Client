
const Footer = () => {
  return (
    <footer className="footer md:footer-horizontal section-gradient gap-2 items-center justify-center md:justify-between mt-4 pb-8 md:pb-0 md:px-4">
  <aside className="flex-col items-center">
        <img className="w-24" src="/favicon.png" alt="Logo" />
        <p className="-mt-4">Microloan Request & Tracking Platform</p>
  </aside>
  <div>
      <p>Copyright © {new Date().getFullYear()} - All Right Reserved</p>
  </div>
  <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
    <a href="https://x.com/HasanAy67180300" target="_blank" className="link">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current">
        <path d="M18.244 2H21L13.5 10.5 22 22h-6.555l-4.3-5.7-4.7 5.7H2l8.744-10.594L2 2h6.6l4.1 5.8L18.244 2z"></path>
      </svg>
    </a>
    <a href="https://www.facebook.com/hasan865" target="_blank" className="link">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current">
        <path
          d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
      </svg>
    </a>
    <a href="https://www.youtube.com/@pixie-67" target="_blank" className="link">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current">
        <path
          d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
      </svg>
    </a>
  </nav>
</footer>
  )
};

export default Footer;
