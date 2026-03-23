import webEngine from './src/app.js';
import './src/infrastructure/db.js';

const LISTEN_PORT = process.env.PORT || 3000;

webEngine.listen(LISTEN_PORT, () => {
  console.log('----------------------------------------------');
  console.log(`Backend service active on port ${LISTEN_PORT}`);
  console.log(`Explore docs: http://localhost:${LISTEN_PORT}/docs`);
  console.log('----------------------------------------------');
});
