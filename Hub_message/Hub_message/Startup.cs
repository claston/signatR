using Owin;
using Microsoft.Owin;
using Microsoft.AspNet.SignalR;

[assembly: OwinStartup(typeof(Hub_Message.Startup))]
namespace Hub_Message
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
           // app.MapSignalR("/~/signalr", new HubConfiguration());
           app.MapSignalR();
        }

    }
}