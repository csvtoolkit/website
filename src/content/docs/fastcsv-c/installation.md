# Installation

FastCSV C library can be installed in several ways depending on your environment and preferences. Choose the method that works best for your setup.

## Method 1: Build from Source (Recommended)

The most reliable way to install FastCSV is building from source, which ensures compatibility with your system.

### Prerequisites

- C99 compatible compiler (GCC, Clang)
- POSIX-compliant system
- Make build system
- Valgrind (optional, for memory testing)

### Build Steps

```bash
# Clone the repository
git clone https://github.com/csvtoolkit/FastCSV-C.git
cd FastCSV-C

# Build shared and static libraries
make

# Run tests to verify installation
make test

# Optional: Run memory safety checks
make valgrind

# Performance benchmarks
make benchmark
```

### Build Targets

| Target | Description |
|--------|-------------|
| `make` | Build shared and static libraries |
| `make shared` | Build shared library (`libcsv.so`) |
| `make static` | Build static library (`libcsv.a`) |
| `make test` | Run all tests |
| `make valgrind` | Run tests with Valgrind |
| `make benchmark` | Run performance benchmarks |
| `make clean` | Clean build artifacts |
| `make help` | Show all available targets |

## Method 2: Package Managers

### Ubuntu/Debian

```bash
# Add repository (when available)
sudo add-apt-repository ppa:csvtoolkit/fastcsv
sudo apt update
sudo apt install libfastcsv-dev

# Or build from source
sudo apt install build-essential git
git clone https://github.com/csvtoolkit/FastCSV-C.git
cd FastCSV-C && make && sudo make install
```

### macOS

```bash
# Using Homebrew (coming soon)
brew install csvtoolkit/tap/fastcsv

# Or build from source
brew install make
git clone https://github.com/csvtoolkit/FastCSV-C.git
cd FastCSV-C && make && make install
```

## Method 3: Docker Installation

For containerized environments, we provide Docker images with FastCSV pre-installed:

```dockerfile
# Use our official FastCSV image
FROM csvtoolkit/fastcsv:latest

# Or add to existing image
FROM ubuntu:22.04
RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    valgrind \
    && git clone https://github.com/csvtoolkit/FastCSV-C.git \
    && cd FastCSV-C \
    && make \
    && make install
```

## Verification

After installation, verify that FastCSV is properly built and working:

```bash
# Check if libraries are installed
ls -la /usr/local/lib/libcsv*

# Run test suite
cd FastCSV-C
make test

# Check memory safety
make valgrind

# Test basic functionality
./tests/test_runner
```

## Using in Your Project

### Linking with Shared Library

```bash
# Compile with shared library
gcc -o myapp myapp.c -lcsv -L/usr/local/lib -I/usr/local/include

# Set library path if needed
export LD_LIBRARY_PATH=/usr/local/lib:$LD_LIBRARY_PATH
```

### Linking with Static Library

```bash
# Compile with static library
gcc -o myapp myapp.c /usr/local/lib/libcsv.a -I/usr/local/include
```

### CMake Integration

```cmake
# Find FastCSV library
find_package(FastCSV REQUIRED)

# Link with your target
target_link_libraries(myapp FastCSV::csv)
```

### Makefile Example

```makefile
CC = gcc
CFLAGS = -Wall -Wextra -std=c99 -I/usr/local/include
LDFLAGS = -L/usr/local/lib -lcsv

myapp: myapp.c
	$(CC) $(CFLAGS) -o $@ $< $(LDFLAGS)
```

## Troubleshooting

### Compilation Errors

- **Missing headers**: Ensure `-I/usr/local/include` is in your CFLAGS
- **Missing library**: Ensure `-L/usr/local/lib -lcsv` is in your LDFLAGS
- **C99 required**: Use `-std=c99` flag for C99 compatibility
- **POSIX functions**: Ensure you're on a POSIX-compliant system

### Runtime Errors

- **Library not found**: Set `LD_LIBRARY_PATH=/usr/local/lib`
- **Permission denied**: Check file permissions and ownership
- **Memory issues**: Run with Valgrind to detect memory problems

### Test Failures

- **Arena tests failing**: Check system memory availability
- **File I/O tests**: Ensure write permissions in test directory
- **Encoding tests**: Verify locale settings support UTF-8

### Performance Issues

- **Slow parsing**: Check if optimizations are enabled (`-O2` or `-O3`)
- **Memory usage**: Use arena-based allocation for better performance
- **File I/O**: Ensure files are on fast storage (SSD recommended)

## Development Setup

For developers wanting to contribute or modify FastCSV:

```bash
# Clone the repository
git clone https://github.com/csvtoolkit/FastCSV-C.git
cd FastCSV-C

# Install development dependencies
sudo apt install valgrind cppcheck

# Build with debug symbols
make debug

# Run comprehensive tests
make test-all
make valgrind-all
make stress-test
```

## Next Steps

Once FastCSV is installed and verified, you're ready to start using it! Check out the [Quick Start Guide](/docs/fastcsv-c/quick-start) to learn the basics, or dive into the [API Reference](/docs/fastcsv-c/api-reference) for detailed documentation. 