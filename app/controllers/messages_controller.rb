class MessagesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def create
    @message = Message.new(message_params)
    @chat_room = ChatRoom.find(params[:chat_room_id])
    @message.chat_room = @chat_room
    if @message.save
      respond_to do |format|
        format.html { redirect_to chat_room_path(@chat_room) }
        format.js
        format.json
      end
    else
      respond_to do |format|
        format.html { render "chat_rooms/show" }
        format.js
        format.json
      end
    end
  end

  private

  def message_params
    params.require(:message).permit(:startX, :startY, :endX, :endY, :color, :content, :angle, :size, :message_type)
  end
end
