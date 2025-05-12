<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

<h1>Feel the Charge - Backend</h1>

<p>Welcome to the <em>Feel the Charge</em> ecommerce backend! This NestJS application provides a comprehensive backend solution for an ecommerce platform, featuring user authentication, order management, and product maintenance. This application has been containerized with Docker, leverages MongoDB (Atlas), and uses Prisma as an ORM.</p>

<h2>Table of Contents</h2>
<ol>
  <li><a href="#project-overview">Project Overview</a></li>
  <li><a href="#features">Features</a></li>
  <li><a href="#tech-stack">Tech Stack</a></li>
  <li><a href="#getting-started">Getting Started</a></li>
  <li><a href="#environment-variables">Environment Variables</a></li>
  <li><a href="#api-endpoints">API Endpoints</a></li>
  <li><a href="#development-and-contribution">Development and Contribution</a></li>
</ol>

<h2 id="project-overview">Project Overview</h2>
<p><strong>Feel the Charge</strong> is an ecommerce application backend where:</p>
<ul>
  <li><strong>Users</strong> can browse through the products and place orders.</li>
  <li><strong>Admins</strong> can manage products and maintain the application.</li>
</ul>
<p>The project features a well-structured codebase with JWT and Google OAuth authentication for secure access, enabling a seamless user experience for both customers and administrators. Product images are securely stored in AWS S3, providing reliable storage for media assets.</p>

<h2 id="features">Features</h2>
<ul>
  <li><strong>User Authentication</strong>:
    <ul>
      <li>Implemented using JWT for secure sessions.</li>
      <li>Google OAuth integration for easy sign-in.</li>
    </ul>
  </li>
  <li><strong>Role-based Access Control</strong>:
    <ul>
      <li><strong>Admin</strong>: Full access to manage the application, including creating, updating, and deleting products.</li>
      <li><strong>User</strong>: Access to view products and place orders.</li>
    </ul>
  </li>
  <li><strong>Order Management</strong>: Allows users to create orders and view order history.</li>
  <li><strong>Product Management</strong>: Enables admins to add, update, and delete products within the application.</li>
  <li><strong>Image Storage</strong>: Product images are stored in AWS S3 for secure and scalable media storage.</li>
</ul>

<h2 id="tech-stack">Tech Stack</h2>
<ul>
  <li><strong>Backend Framework</strong>: <a href="https://nestjs.com/">NestJS</a></li>
  <li><strong>Database</strong>: <a href="https://www.mongodb.com/atlas">MongoDB Atlas</a> (NoSQL)</li>
  <li><strong>ORM</strong>: <a href="https://www.prisma.io/">Prisma</a></li>
  <li><strong>Containerization</strong>: <a href="https://www.docker.com/">Docker</a></li>
  <li><strong>Authentication</strong>: JWT & Google OAuth</li>
  <li><strong>File Storage</strong>: AWS S3</li>
</ul>

<h2 id="getting-started">Getting Started</h2>

<h3>Prerequisites</h3>
<p>Ensure that you have the following tools installed:</p>
<ul>
  <li><a href="https://nodejs.org/">Node.js</a> (v14 or above)</li>
  <li><a href="https://www.docker.com/">Docker</a> for containerization</li>
  <li><a href="https://www.mongodb.com/cloud/atlas">MongoDB Atlas Account</a> for cloud database</li>
</ul>

<h3>Installation</h3>
<ol>
  <li><strong>Clone the Repository</strong>:
    <pre><code>git clone https://github.com/your-username/feel-the-charge-backend.git
cd feel-the-charge-backend
    </code></pre>
  </li>
  <li><strong>Install Dependencies</strong>:
    <pre><code>npm install</code></pre>
  </li>
  <li><strong>Configure Environment Variables</strong>:
    <p>Create a <code>.env</code> file in the root directory and populate it with the necessary variables (see <a href="#environment-variables">Environment Variables</a>).</p>
  </li>
  <li><strong>Start the Application</strong>:
    <ul>
      <li><strong>With Docker</strong>:
        <pre><code>docker-compose up --build</code></pre>
      </li>
      <li><strong>Without Docker</strong>:
        <pre><code>npm run start:dev</code></pre>
      </li>
    </ul>
  </li>
  <li><strong>Database Migration</strong>:
    <p>Run Prisma migrations to sync the database schema.</p>
    <pre><code>npx prisma migrate dev</code></pre>
  </li>
</ol>
<p>The application should now be running on <code>http://localhost:3000</code>.</p>

<h2 id="environment-variables">Environment Variables</h2>
<p>Ensure the following variables are set in your <code>.env</code> file:</p>

<pre><code># Database
DATABASE_URL="mongodb+srv://&lt;username&gt;:&lt;password&gt;@cluster0.mongodb.net/feel_the_charge?retryWrites=true&w=majority"

# JWT
JWT_SECRET="&lt;your_jwt_secret&gt;"
JWT_EXPIRATION="3600s"

# Google OAuth
GOOGLE_CLIENT_ID="&lt;your_google_client_id&gt;"
GOOGLE_CLIENT_SECRET="&lt;your_google_client_secret&gt;"

# AWS S3
AWS_ACCESS_KEY_ID="&lt;your_aws_access_key_id&gt;"
AWS_SECRET_ACCESS_KEY="&lt;your_aws_secret_access_key&gt;"
AWS_REGION="&lt;your_aws_region&gt;"
AWS_BUCKET_NAME="&lt;your_s3_bucket_name&gt;"
</code></pre>

<h2 id="api-endpoints">API Endpoints</h2>
<p>Here is a summary of key API endpoints. Detailed documentation can be found in the project’s Swagger documentation (accessible at <code>/api/docs</code> when running the app).</p>

<h3>Authentication</h3>
<ul>
  <li><strong>POST /auth/login</strong> - User login with JWT.</li>
  <li><strong>POST /auth/google</strong> - Google OAuth sign-in.</li>
</ul>

<h3>Users</h3>
<ul>
  <li><strong>GET /users/me</strong> - Fetch current user profile.</li>
  <li><strong>GET /users/orders</strong> - View user order history (authenticated user only).</li>
</ul>

<h3>Products</h3>
<ul>
  <li><strong>GET /products</strong> - View all available products.</li>
  <li><strong>POST /products</strong> - Add a new product (admin only).</li>
  <li><strong>PUT /products/:id</strong> - Update an existing product (admin only).</li>
  <li><strong>DELETE /products/:id</strong> - Delete a product (admin only).</li>
</ul>

<h3>Orders</h3>
<ul>
  <li><strong>POST /orders</strong> - Place an order (user only).</li>
  <li><strong>GET /orders/:id</strong> - View a specific order.</li>
</ul>

<h2 id="development-and-contribution">Development and Contribution</h2>
<p>To contribute to this project:</p>
<ol>
  <li><strong>Fork the repository</strong> and create a new branch.</li>
  <li>Make your changes and ensure tests pass.</li>
  <li>Submit a pull request for review.</li>
</ol>

<p>Thank you for checking out <em>Feel the Charge</em>!</p>

</body>
</html>
