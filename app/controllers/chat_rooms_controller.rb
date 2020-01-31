class ChatRoomsController < ApplicationController
  def show
    @chat_room = ChatRoom.find(params[:id])
  end

  def broadcast_message(message)
    chat_room = ChatRoom.first
    ActionCable.server.broadcast("chat_room_#{chat_room.id}", {
      message_json: message
    })
  end
end
