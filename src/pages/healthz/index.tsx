// health check URL
function Healthz() {}

// This gets called on every request
export async function getServerSideProps(context) {
  context.res.end('health');
  return { props: {} };
}

export default Healthz;
