class Message < ApplicationRecord
  belongs_to :chat_room
  after_create :broadcast_message

  def broadcast_message
    ActionCable.server.broadcast("chat_room_#{chat_room.id}", {
      message_partial: ApplicationController.renderer.render(partial: "messages/message", locals: { message: self}),
      message_json: self
    })
  end
end