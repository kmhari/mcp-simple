# OpenAI Compatible API MCP Server (English)

This project is a Model Context Protocol (MCP) server that integrates various tools based on OpenAI compatible APIs and SiliconFlow APIs. It offers a range of functionalities including image generation, image editing, speech synthesis (TTS), speech-to-text (STT), and video generation.

## Core Features

-   **Image Generation**: Generate images using OpenAI compatible APIs (e.g., DALL-E 3, gpt-image-1, or other Stable Diffusion models).
-   **Image Editing**: Edit images using OpenAI compatible APIs (e.g., gpt-image-1).
-   **Speech Synthesis (TTS)**: Convert text into speech using OpenAI compatible APIs.
-   **Speech-to-Text (STT)**: Transcribe audio files into text using OpenAI compatible APIs.
-   **Video Generation**: Submit text-to-video or image-to-video generation tasks using the SiliconFlow API.
-   **Background Task Processing**: For time-consuming tasks (like image generation/editing with specific models, video generation), the server accepts the task and processes it asynchronously. Notifications are sent via configured channels (OneBot or Telegram) upon completion or failure.
-   **File Upload**: Supports uploading generated images and videos to a configured ImgBed service based on [MarSeventh/CloudFlare-ImgBed](https://github.com/MarSeventh/CloudFlare-ImgBed).
-   **Local Storage**: All generated media files are saved locally.

## Prerequisites

-   Node.js (recommended version >= 18.x)
-   Relevant API keys (OpenAI/compatible API key, SiliconFlow API key, etc.)

## Installation and Setup

1.  **Clone the project** (if you haven't already):
    ```bash
    git clone <project_repository_url>
    cd openapi-integrator-mcp
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Build the project**:
    ```bash
    npm run build
    ```
    The build output will be in the `build` directory.

## Configuration

Configure environment variables via a `.env` file in the project root. If the `.env` file does not exist, create it based on `.env.example` (if provided) or the list below.

### Key Environment Variables:

-   `OPENAI_API_KEY`: (Required) Your OpenAI API key or a compatible API key.
-   `OPENAI_API_BASE_URL`: (Optional) Base URL for the OpenAI compatible API. Defaults to `https://api.openai.com`.
-   `REQUEST_TIMEOUT`: (Optional) API request timeout in milliseconds. Defaults to `180000` (3 minutes).
-   `OUTPUT_DIR`: (Optional) Base output directory for generated media files. Defaults to `./output`. Subdirectories like `images`, `audio`, `video` will be created here.

**Default Model Configuration for Image Generation/Editing:**
-   `DEFAULT_IMAGE_MODEL`: (Optional) Default image generation model. Defaults to `dall-e-3`.
-   `DEFAULT_EDIT_IMAGE_MODEL`: (Optional) Default image editing model. Defaults to `gpt-image-1`.
-   `DEFAULT_IMAGE_WIDTH`: (Optional) Default image width (for non-DALL-E 3/gpt-image-1 models). Defaults to `1024`.
-   `DEFAULT_IMAGE_HEIGHT`: (Optional) Default image height (for non-DALL-E 3/gpt-image-1 models). Defaults to `768`.
-   `DEFAULT_IMAGE_STEPS`: (Optional) Default image generation steps (for non-DALL-E 3/gpt-image-1 models). Defaults to `20`.

**Default Speech Configuration:**
-   `DEFAULT_SPEECH_MODEL`: (Optional) Default speech synthesis model. Defaults to `tts-1`.
-   `DEFAULT_SPEECH_VOICE`: (Optional) Default speech synthesis voice. Defaults to `alloy`.
-   `DEFAULT_SPEECH_SPEED`: (Optional) Default speech synthesis speed. Defaults to `1.0`.
-   `DEFAULT_TRANSCRIPTION_MODEL`: (Optional) Default speech transcription model. Defaults to `whisper-1`.

**SiliconFlow Video Generation Configuration:**
-   `SILICONFLOW_API_KEY`: (Optional, Required if using video generation) SiliconFlow API key.
-   `SILICONFLOW_BASE_URL`: (Optional) SiliconFlow API base URL. Defaults to `https://api.siliconflow.cn`.
-   `SILICONFLOW_VIDEO_MODEL`: (Optional) Default video generation model. Defaults to `Wan-AI/Wan2.1-T2V-14B-Turbo`.

**Notification Configuration (configure at least one to receive background task results):**
-   `ONEBOT_HTTP_URL`: (Optional) OneBot HTTP post URL (e.g., `http://localhost:5700`).
-   `ONEBOT_ACCESS_TOKEN`: (Optional) OneBot Access Token (if required).
-   `ONEBOT_MESSAGE_TYPE`: (Optional) OneBot message type (`private` or `group`).
-   `ONEBOT_TARGET_ID`: (Optional) OneBot target user ID or group ID.
-   `TELEGRAM_BOT_TOKEN`: (Optional) Telegram Bot Token.
-   `TELEGRAM_CHAT_ID`: (Optional) Telegram Chat ID.

**ImgBed Configuration (Optional, for `MarSeventh/CloudFlare-ImgBed`):**
-   `CF_IMGBED_UPLOAD_URL`: (Optional) Your deployed `CloudFlare-ImgBed` upload URL (e.g., `https://your-worker.your-domain.workers.dev/upload`).
-   `CF_IMGBED_API_KEY`: (Optional) The `AUTH_KEY` (or `authCode` as referred to in some contexts) configured for your `CloudFlare-ImgBed` instance.

## Running the Server

-   **Production Mode**:
    ```bash
    npm start
    ```
    This will run the JavaScript files from the `build` directory.

-   **Development Mode** (uses ts-node-dev for hot-reloading):
    ```bash
    npm run dev
    ```

Once started, the MCP server will listen for requests on standard input/output (stdio).

## Available MCP Tools

### 1. `generate_image`

Generates an image.

-   **Function**: Creates an image based on a text prompt using OpenAI compatible APIs. Supports various models like DALL-E 3, gpt-image-1, and others. For DALL-E 3/gpt-image-1, tasks are processed in the background with results sent via notification. Other models return results synchronously.
-   **Key Parameters**:
    -   `prompt` (string, required): Description of the image.
    -   `model` (string, optional): Model to use, defaults to `DEFAULT_IMAGE_MODEL` from config.
    -   `n` (number, optional): Number of images to generate.
    -   (DALL-E 3/gpt-image-1 specific): `quality`, `size`, `background`, `moderation`.
    -   (Other models specific): `width`, `height`, `steps`.

### 2. `edit_image`

Edits an image.

-   **Function**: Modifies an existing image based on a text prompt using models like `gpt-image-1`. Tasks are processed in the background with results sent via notification.
-   **Key Parameters**:
    -   `image` (string, required): Path or URL of the image to edit.
    -   `prompt` (string, required): Editing instructions.
    -   `model` (string, optional): Model to use, defaults to `DEFAULT_EDIT_IMAGE_MODEL` from config.
    -   `n` (number, optional): Number of images to generate.
    -   `size` (string, optional): Output image size.

### 3. `generate_speech`

Text-to-Speech.

-   **Function**: Converts text into an audio file (MP3 format) and saves it locally.
-   **Key Parameters**:
    -   `input` (string, required): Text to convert to speech.
    -   `voice` (string, required): Voice to use.
    -   `model` (string, optional): Model to use, defaults to `DEFAULT_SPEECH_MODEL` from config.
    -   `speed` (number, optional): Speech speed, defaults to `DEFAULT_SPEECH_SPEED` from config.

### 4. `transcribe_audio`

Speech-to-Text.

-   **Function**: Transcribes an audio file into text.
-   **Key Parameters**:
    -   `file` (string, required): Local path or URL of the audio file.
    -   `model` (string, optional): Model to use, defaults to `DEFAULT_TRANSCRIPTION_MODEL` from config.

### 5. `generate_video`

Generates a video.

-   **Function**: Submits a video generation task to the SiliconFlow API. Supports text-to-video and image-to-video. Tasks are processed in the background with results sent via notification.
-   **Key Parameters**:
    -   `prompt` (string, required): Description of the video.
    -   `image_size` (string, required): Video dimensions/aspect ratio (e.g., "1280x720").
    -   `model` (string, optional): Video model to use, defaults to `SILICONFLOW_VIDEO_MODEL` from config. Supported models include: `Wan-AI/Wan2.1-T2V-14B`, `Wan-AI/Wan2.1-T2V-14B-Turbo`, `Wan-AI/Wan2.1-I2V-14B-720P`, `Wan-AI/Wan2.1-I2V-14B-720P-Turbo`.
    -   `image` (string, optional): Image URL or Base64 encoded data, required for Image-to-Video models.
    -   `negative_prompt` (string, optional): Negative prompt.
    -   `seed` (integer, optional): Random seed.

## Notification Feature

For tasks processed in the background (e.g., specific image generation/editing, video generation), results will be sent via notifications configured through:

-   **OneBot**: If `ONEBOT_HTTP_URL`, `ONEBOT_MESSAGE_TYPE`, and `ONEBOT_TARGET_ID` are configured.
-   **Telegram**: If `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are configured.

Please ensure at least one notification method is configured to receive results for background tasks.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
