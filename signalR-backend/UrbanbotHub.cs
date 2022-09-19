using Microsoft.AspNetCore.SignalR;

namespace signalR_backend
{
    public class UrbanbotHub: Hub
    {
        public override Task OnConnectedAsync()
        {
            Console.WriteLine("Подключено!");
            return base.OnConnectedAsync();
        }

        public async Task<string> Echo(string message)
        {
            return message;
        }
    }
}
