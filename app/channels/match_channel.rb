class MatchChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "match_#{params[:match_id]}"
    # stream_from "some_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
