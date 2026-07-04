import os

# Suppress LiteLLM startup warnings (fetch errors, unused stream decoders)
os.environ.setdefault("LITELLM_LOG", "ERROR")


def main():
    print("Hello from fingraphrag!")


if __name__ == "__main__":
    main()
