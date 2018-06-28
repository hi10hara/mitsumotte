
<template>
  <div class="cover">
    <div class="request-detail">
      <div class="header">
        <div class="title">
          腕時計の見積依頼
       </div>
      </div>
    <div class="categories">
      カテゴリー：腕時計
    </div>
     <div class="comment">
       説明
       ガラス割れました。
       見積もりお願いいたします。
     </div>
<div class="top-img">
</div>
     <div class="timeline">
<body>
    <div id="your_container">

        <!-- チャットの外側部分① -->
        <div id="bms_messages_container">
            <!-- ヘッダー部分② -->
            <div id="bms_chat_header">
                <!--ステータス-->
                <div id="bms_chat_user_status">
                    <!--ステータスアイコン-->
                    <div id="bms_status_icon">✉</div>
                    <!--ユーザー名-->
                    <div id="chat-title">メッセージ</div>
                </div>
            </div>

            <!-- タイムライン部分③ -->
            <div id="bms_messages">

                <!--メッセージ１（左側）-->
                <div class="bms_message bms_left">
                    <div class="bms_message_box">
                        <div class="bms_message_content">
                            <div class="bms_message_text">ほうほうこりゃー便利じゃないか</div>
                        </div>
                    </div>
                </div>
                <div class="bms_clear"></div><!-- 回り込みを解除（スタイルはcssで充てる） -->

                <!--メッセージ２（右側）-->
                <div class="bms_message bms_right">
                    <div class="bms_message_box">
                        <div class="bms_message_content">
                            <div class="bms_message_text">うん、まあまあいけとるな</div>
                        </div>
                    </div>
                </div>
                <div class="bms_clear"></div><!-- 回り込みを解除（スタイルはcssで充てる） -->
            </div>

            <!-- テキストボックス、送信ボタン④ -->
            <div id="bms_send">
                     <input type="hidden" name="item_id" value="m96627376588">
          <textarea type="text" name="body" value="" class="textarea" cols="60" rows="8"></textarea>
          <button type="submit" class="btn" >
          <i class="icon-message"></i>
          <span>取引メッセージを送る</span>
          </button>
            </div>
        </div>
    </div>
</body>

    </div>  
 
    </div>
  </div>
</template>
<script>
export default {
}
</script>
