$(document).ready(function() {

    $('#createPartyBtn').click(function() {
        $('#createJoinRoomModal').modal('show');
        $('#modalOverlay').show();
    });

    $('#createJoinRoomModal').on('hidden.bs.modal', function () {
        $('#modalOverlay').hide();
    });
  
  function generateRoomID() {
      return Math.random().toString(36).substr(2, 9);
  }

  $('#createRoomBtn').click(function() {
      var roomID = generateRoomID();
      window.location.href = '/room/' + roomID;
  });

  $('#joinRoomBtn').click(function() {
      var roomID = prompt('Enter Room ID:');
      if (roomID) {
          window.location.href = '/room/' + roomID;
      }
  });
});
