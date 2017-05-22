using Microsoft.AspNet.SignalR;

namespace Hub_Message
{
    public class ChatHub : Hub
    {
        public async System.Threading.Tasks.Task SendMessage(string grupo, string nome, string mensagem)
        {
            await Groups.Add(Context.ConnectionId, grupo);
            //Clients.All.broadcastMessage(nome, mensagem);
            Clients.Group(grupo).broadcastMessage(nome, mensagem);
        }
        /*
        public async System.Threading.Tasks.Task SendToaster(string grupo, string nome, string mensagem)
        {
            await Groups.Add(Context.ConnectionId, grupo);
            //Clients.All.broadcastMessage(nome, mensagem);
            Clients.OthersInGroup(grupo).toastMessage(nome, mensagem);
        }*/
    }
}