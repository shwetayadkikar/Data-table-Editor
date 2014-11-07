using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(FinalGradebookPOC.Startup))]
namespace FinalGradebookPOC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
