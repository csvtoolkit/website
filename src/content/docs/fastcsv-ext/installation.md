# Installation

FastCSV-ext can be installed in several ways depending on your environment and preferences. Choose the method that works best for your setup.

## Method 1: Pre-built Binaries (Recommended)

Pre-built binaries are available for major platforms and provide the easiest installation experience.

### Linux (Ubuntu/Debian)

```bash
# Download the latest release
# Visit: https://github.com/csvtoolkit/FastCSV-ext/releases

# Download the appropriate file for your PHP version
# Example: fastcsv-linux-php8.4.so for PHP 8.4

# Copy to PHP extensions directory
sudo cp fastcsv-linux-php8.4.so /usr/lib/php/$(php -r "echo PHP_MAJOR_VERSION.'.'.PHP_MINOR_VERSION;")/fastcsv.so

# Enable the extension
echo "extension=fastcsv" | sudo tee /etc/php/$(php -r "echo PHP_MAJOR_VERSION.'.'.PHP_MINOR_VERSION;")/mods-available/fastcsv.ini
sudo phpenmod fastcsv
```

### macOS

```bash
# Download the latest release
# Visit: https://github.com/csvtoolkit/FastCSV-ext/releases

# Download the appropriate file for your PHP version
# Example: fastcsv-macos-php8.4.so for PHP 8.4

# Copy to PHP extensions directory
sudo cp fastcsv-macos-php8.4.so /usr/local/lib/php/extensions/no-debug-non-zts-*/fastcsv.so

# Add to php.ini
echo "extension=fastcsv" >> /usr/local/etc/php/php.ini
```

### Enable Extension

Add to your `php.ini`:

```ini
extension=fastcsv
```

Or load dynamically:

```php
dl('fastcsv.so'); // Linux/macOS
```

## Method 2: Build from Source (Advanced)

For advanced users, custom configurations, or when pre-built binaries aren't available, you can build from source.

### Prerequisites

- PHP 8.2+ development headers (`php-dev` package)
- GCC or compatible C compiler
- Make and autotools
- Git

### Build Steps

```bash
# Clone the repository
git clone https://github.com/csvtoolkit/FastCSV-ext.git
cd FastCSV-ext

# Initialize submodules (includes FastCSV-C library)
git submodule update --init --recursive

# Build the extension
phpize
./configure
make

# Install
sudo make install

# Enable the extension
echo "extension=fastcsv" | sudo tee /etc/php/$(php -r "echo PHP_MAJOR_VERSION.'.'.PHP_MINOR_VERSION;")/mods-available/fastcsv.ini
sudo phpenmod fastcsv
```

## Method 3: PECL Installation (Coming Soon)

FastCSV-ext will be available through PECL for easy installation:

```bash
# Install via PECL (coming soon)
pecl install fastcsv

# Enable the extension
echo "extension=fastcsv" >> /etc/php/php.ini
```

## Verification

After installation, verify that FastCSV-ext is properly loaded:

```bash
# Check if extension is loaded
php -m | grep fastcsv

# View extension information
php -i | grep fastcsv

# Test basic functionality
php -r "echo 'FastCSV-ext version: ' . phpversion('fastcsv') . PHP_EOL;"
```

## Docker Installation

For containerized environments, you can build FastCSV-ext into your Docker images:

```dockerfile
# Build FastCSV-ext in your PHP image
FROM php:8.3-cli

# Install build dependencies
RUN apt-get update && apt-get install -y \
    git \
    build-essential \
    autoconf \
    && rm -rf /var/lib/apt/lists/*

# Clone and build FastCSV-ext
RUN git clone https://github.com/csvtoolkit/FastCSV-ext.git /tmp/fastcsv-ext \
    && cd /tmp/fastcsv-ext \
    && git submodule update --init --recursive \
    && phpize \
    && ./configure \
    && make \
    && make install \
    && echo "extension=fastcsv" > /usr/local/etc/php/conf.d/fastcsv.ini \
    && rm -rf /tmp/fastcsv-ext
```

## Development Setup

For developers working on FastCSV-ext:

```bash
# Clone with submodules
git clone --recursive https://github.com/csvtoolkit/FastCSV-ext.git
cd FastCSV-ext

# Build in development mode
phpize
./configure --enable-debug
make

# Run tests
make test

# Install for testing
sudo make install
```

## Troubleshooting

### Extension Not Loading

- Check PHP error logs for loading errors
- Verify the extension file is in the correct directory
- Ensure PHP version compatibility (8.2, 8.3, or 8.4)
- Check file permissions on the extension file

### Compilation Errors

- Install PHP development headers: `apt-get install php-dev`
- Update build tools: `apt-get install build-essential`
- Check PHP version compatibility
- Ensure submodules are initialized: `git submodule update --init --recursive`

### Performance Issues

- Verify FastCSV-ext is actually being used (check `phpinfo()`)
- Compare with native PHP functions using our benchmark scripts
- Check system resources and file I/O performance

### Memory Issues

- FastCSV-ext uses Arena memory management for optimal performance
- Memory usage should remain constant regardless of file size
- If you experience memory issues, check for memory leaks in your application code

## Next Steps

Once FastCSV-ext is installed and verified, you're ready to start using it! Check out the [Quick Start Guide](/docs/fastcsv-ext/quick-start) to learn the basics, or dive into the [API Reference](/docs/fastcsv-ext/api-reference) for detailed documentation. 