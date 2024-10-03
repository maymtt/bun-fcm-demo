# Use Bun official image
FROM oven/bun:1.0.0

# Set the working directory
WORKDIR /app

# Copy the Bun.lockb and package.json
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the app files
COPY . .

# Expose the port
EXPOSE 3000

# Run the Bun application
CMD ["bun", "--hot", "index.ts"]
