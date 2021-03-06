class GameChannel < ApplicationCable::Channel
  def subscribed
    stream_from "game_#{params[:game_id]}"
    # stream_from "some_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    puts data

    move = {
      "move": data["move"]
    }

    ActionCable.server.broadcast("game_#{params[:game_id]}", move )
  end
end
