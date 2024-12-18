// src/pages/swagger.js
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function SwaggerPage() {
  const swaggerUrl = '/api/swagger';

  return (
    <div>
      <SwaggerUI url={swaggerUrl} />
    </div>
  );
}
