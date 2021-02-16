<template>
  <ckeditor
    :editor="editor"
    :config="editorConfig"
    :value="value"
    :tagName="tagName"
    :disabled="disabled"
    @input="(event) => $emit('input', event)"
  />
</template>

<script>
import CKEditor from "@ckeditor/ckeditor5-vue2";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";

import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Link from "@ckeditor/ckeditor5-link/src/link";
import List from "@ckeditor/ckeditor5-list/src/list";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Table from "@ckeditor/ckeditor5-table/src/table";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";
import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";

export default {
  name: "Editor",
  components: {
    ckeditor: CKEditor.component,
  },
  props: {
    value: {
      type: String,
      required: false,
    },
    tagName: {
      type: String,
      required: false,
      default: "div",
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    name: {
      type: String,
      required: false,
      default: "default",
    },
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        plugins: [
          Alignment,
          Autoformat,
          Bold,
          BlockQuote,
          Essentials,
          Heading,
          Image,
          ImageCaption,
          ImageStyle,
          ImageToolbar,
          ImageUpload,
          Italic,
          Link,
          List,
          MediaEmbed,
          Paragraph,
          Table,
          TableToolbar,
          SimpleUploadAdapter,
        ],
        toolbar: {
          items: [
            "heading",
            "|",
            "alignment",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "|",
            "insertTable",
            "imageUpload",
            "mediaEmbed",
            "blockQuote",
            "undo",
            "redo",
          ],
        },
        table: {
          contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
        },
        image: {
          toolbar: ["imageStyle:full", "imageStyle:side", "|", "imageTextAlternative"],
        },
        simpleUpload: {
          uploadUrl: "/api/v1/image/" + this.name,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        },
      },
    };
  },
};
</script>
