(function(Scratch) {
  'use strict';

  class SimpleMailSender {
    getInfo() {
      return {
        id: 'simplemailsender',
        name: 'かんたんメール',
        color1: '#ff4d4d', // 郵便ポストみたいな赤色
        color2: '#cc0000',
        blocks: [
          {
            opcode: 'sendMail',
            blockType: Scratch.BlockType.COMMAND,
            text: '[EMAIL] に [MESSAGE] をメールでおくる',
            arguments: {
              EMAIL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'あてさき@example.com'
              },
              MESSAGE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'こんにちは！'
              }
            }
          }
        ]
      };
    }

    sendMail(args) {
      const email = String(args.EMAIL);
      const message = String(args.MESSAGE);

      // メールアドレスに「@」が入っていない場合は送らない
      if (!email.includes('@')) {
        console.log('メールアドレスが ただしくありません');
        return;
      }

      // FormSubmitの裏側通信用（ajax）のURLをつくる
      const url = `https://formsubmit.co/ajax/${encodeURIComponent(email)}`;

      // メールをおくる命令
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: 'TurboWarpからの おしらせ', // メールの一覧に表示されるタイトル
          message: message
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('メールをおくりました:', data);
      })
      .catch(error => {
        console.error('エラーがおきました:', error);
      });
    }
  }

  Scratch.extensions.register(new SimpleMailSender());
})(Scratch);
